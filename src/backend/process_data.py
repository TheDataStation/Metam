'''
This file can be used to run for schools data with classification task.

For other tasks, please change line 19 to import respective Oracle, e.g. regression_oracle for Figure 3b
causal_oracle for Figure 3c.

'''


from distutils.ccompiler import new_compiler
import profile_weights
import os,copy
import profile
from sklearn.feature_selection import mutual_info_classif
from os import listdir
from os.path import isfile, join
import pandas as pd
from dataset import Dataset
from classifier_oracle import Oracle
import math
import pandas as pd
from join_path import JoinKey, JoinPath
from join_column import  JoinColumn
import sys
import pickle
import join_path
import operator,random
from sklearn import datasets, linear_model
import group_helper,querying
random.seed(0)

path='/home/cc/opendata_cleaned/'#open_data_usa/' # path to csv files
query_data='base_school.csv'
class_attr='class'
query_path=path+"/"+query_data
model_path = '../../opendata_graph/'#'/Users/sainyam/Documents/MetamDemo/models/'#  # path to the graph model
uninfo=0
epsilon=0.05

theta = 0.90
tau = len(centers)
filepath='/home/cc/network_opendata_06.csv'




def get_size_dic(path):
    size_dic={}
    f=open(path+'size_lst.txt')
    for line in f:
        line=line.strip()
        line=line.split()
        size_dic[line[1]]=int(line[0])
    return size_dic

def get_ignore_lst():
    ignore_lst=[]
    f=open('ignore.txt','r')
    for line in f:
        line=line.strip()
        ignore_lst.append(line)
    f.close()
    return ignore_lst





options = join_path.get_join_paths_from_file(query_data,filepath)


files = [f for f in listdir(path) if isfile(join(path, f))]


dataset_lst=[]
data_dic={}
iter=0




base_df=pd.read_csv(query_path)


joinable_lst=options


oracle=Oracle("random forest")
orig_metric=oracle.train_classifier(base_df,'class')


print ("original metric is ",orig_metric)

size_dic=get_size_dic(path)
ignore_lst=get_ignore_lst()

i=0
new_col_lst=[]
skip_count=0

while i<len(joinable_lst):
    print (i,len(new_col_lst))
    jp=joinable_lst[i]
    print (jp.join_path[0].tbl,jp.join_path[0].col,jp.join_path[1].tbl,jp.join_path[1].col)
    if jp.join_path[1].tbl in ignore_lst or jp.join_path[0].tbl in ignore_lst:
        i+=1
        continue
    if jp.join_path[1].tbl=='s27g-2w3u.csv'or jp.join_path[0].tbl=='s27g-2w3u.csv':
        skip_count+=1
        i+=1
        continue
    if jp.join_path[0].tbl in size_dic.keys() and jp.join_path[1].tbl in size_dic.keys():
        if size_dic[jp.join_path[0].tbl]>1000000 or size_dic[jp.join_path[1].tbl]>1000000:
            skip_count+=1
            i+=1
            continue


    if jp.join_path[0].tbl not in data_dic.keys():
        df_l=pd.read_csv(path+"/"+jp.join_path[0].tbl,low_memory=False)
        data_dic[jp.join_path[0].tbl]=df_l
        print ("dataset size is ",df_l.shape)
    else:
        df_l=data_dic[jp.join_path[0].tbl]
    if jp.join_path[1].tbl not in data_dic.keys():
        df_r=pd.read_csv(path+"/"+jp.join_path[1].tbl,low_memory=False)
        data_dic[jp.join_path[1].tbl]=df_r
        print ("dataset size is ",df_r.shape)
    else:
        df_r=data_dic[jp.join_path[1].tbl]
    collst=list(df_r.columns)
    if jp.join_path[1].col not in df_r.columns or jp.join_path[0].col not in df_l.columns:
        i+=1
        continue
    if df_r.dtypes[jp.join_path[1].col] == 'float64' or df_r.dtypes[jp.join_path[1].col] == 'int64':
        skip_count+=1
        i+=1
        continue
    for col in collst:
        if jp.join_path[1].tbl=='2013_NYC_School_Survey.csv' or jp.join_path[1].tbl =='5a8g-vpdd.csv':
            continue
        if col==jp.join_path[1].col or jp.join_path[0].col =='class' or col=='class':
            continue
        jc=JoinColumn(jp,df_r,col,base_df,class_attr,len(new_col_lst),uninfo)
        new_col_lst.append(jc)
        if jc.column=='School Type' and jp.join_path[1].tbl=='bnea-fu3k.csv':#2012-2013 ENVIRONMENT GRADE':# and jp.join_path[1].tbl=='test1.csv':
            f1=open('log.txt','a')
            f1.write(str(len(new_col_lst)-1)+" "+jc.column+" "+jc.join_path.join_path[1].tbl+" "+jc.join_path.join_path[1].col+"\n")
            print(col,jc.merged_df,len(new_col_lst)-1,"test1")
            f1.close()
    i+=1

print ("skip count",skip_count)
print ("length is ",len(new_col_lst))


(centers,assignment,clusters)=join_path.cluster_join_paths(new_col_lst,100,epsilon)
print (centers)



weights={}
weights=profile_weights.initialize_weights(new_col_lst[0],weights)

metric=orig_metric
initial_df=copy.deepcopy(base_df)
candidates=centers


if tau==1:
    candidates=[i for i in range(len(new_col_lst))]


augmented_df= querying.run_metam(tau,oracle,candidates,theta,metric,initial_df,new_col_lst,weights,class_attr,clusters,assignment,uninfo,epsilon)    
augmented_df.to_csv('augmented_data.csv')

