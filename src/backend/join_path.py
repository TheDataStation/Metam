import pandas as pd
from join_column import JoinColumn
import random
class JoinPath:
    def __init__(self, join_key_list):
        self.join_path = join_key_list

    def to_str(self):
        format_str = ""
        for i, join_key in enumerate(self.join_path):
            format_str += join_key.tbl[:-4] + '.' + join_key.col
            if i < len(self.join_path) - 1:
                format_str += " JOIN "
        return format_str
    def set_df(self,data_dic):
        for i, join_key in enumerate(self.join_path):
            join_key.dataset=data_dic[join_key.tbl]
    def print_metadata_str(self):
        print(self.to_str())
        for join_key in self.join_path:
            print(join_key.tbl[:-4] + "." + join_key.col)
            print("datasource: {}, unique_values: {}, non_empty_values: {}, total_values: {}, join_card: {}, jaccard_similarity: {}, jaccard_containment: {}"
            .format(join_key.tbl, join_key.unique_values, join_key.total_values, join_key.non_empty, get_join_type(join_key.join_card), join_key.js, join_key.jc))

    def get_distance(self,join_path2):
        #return distance between the join paths

        return 0

class JoinKey:
    def __init__(self, col_drs, unique_values, total_values, non_empty):
        self.dataset=''
        try:
            self.tbl = col_drs.source_name
            self.col = col_drs.field_name
        except:
            self.tbl=''
            self.col=''

        self.unique_values = unique_values
        self.total_values = total_values
        self.non_empty = non_empty
        try: 
           if col_drs.metadata == 0:
                self.join_card = 0
                self.js = 0
                self.jc = 0
           else:
                self.join_card = col_drs.metadata['join_card']
                self.js = col_drs.metadata['js']
                self.jc = col_drs.metadata['jc']
        except:
            self.js=0
def get_join_type(join_card):
    if join_card == 0:
        return "One-to-One"
    elif join_card == 1:
        return "One-to-Many"
    elif join_card == 2:
        return "Many-to-One"
    else:
        return "Many-to-Many"

def find_farthest(distance_dic):
    max_dist=-1
    max_dis_index=-1
    for index in distance_dic.keys():
        if distance_dic[index]>max_dist:
            max_dist=distance_dic[index]
            max_dist_index=index

    print (max_dist,max_dist_index) 
    return max_dist_index


def get_clusters(assignment,k):
    clusters=[]
    i=0
    while i<k:
        clusters.append([])
        i+=1

    for c in assignment.keys():
        lst=clusters[assignment[c]]
        lst.append(c)
        clusters[assignment[c]]=lst
    return clusters

def cluster_join_paths(joinable_lst,k,epsilon):
    i=0
    random.seed(0)
    centers=[]
    assignment={}
    distance={}
    max_dist=0
    while i<k:
        if i==0:
            centers.append(random.randint(0,len(joinable_lst)))     
        else:
            centers.append(find_farthest(distance))
        #Assignment 
        iter=0
        for j in joinable_lst:
            if i==0:
                assignment[j]=0
                distance[iter]=j.get_distance(joinable_lst[centers[-1]])
                if distance[iter]>max_dist:
                    max_dist=distance[iter]
            else:
                new_dist=j.get_distance(joinable_lst[centers[-1]])
                if new_dist < distance[iter]:#j.get_distance(joinable_lst[centers[assignment[j]]]):
                    assignment[j]=len(centers)-1
                    distance[iter]=new_dist#j.get_distance(joinable_lst[centers[-1]])
                    if distance[iter]>max_dist:
                        max_dist=distance[iter]
            iter+=1
                    #update assignment
        if max_dist<epsilon:
            break
        i+=1
    return (centers,assignment,get_clusters(assignment,k))


def get_join_paths_from_file(querydata,filepath):
    df=pd.read_csv(filepath)

    subdf=df[df['tbl1']==querydata]
    subdf2=df[df['tbl2']==querydata]

    options=[]

    for index,row in subdf.iterrows():
        jk1=JoinKey('','',0,0)
        jk2=JoinKey('','',0,0)
        jk1.tbl=row['tbl1']
        jk1.col=row['col1']

        jk2.tbl=row['tbl2']
        jk2.col=row['col2']
        ret_jp = JoinPath([jk1,jk2])
        options.append(ret_jp)


    for index,row in subdf2.iterrows():
        jk1=JoinKey('','',0,0)
        jk2=JoinKey('','',0,0)
        jk1.tbl=row['tbl1']
        jk1.col=row['col1']

        jk2.tbl=row['tbl2']
        jk2.col=row['col2']
        ret_jp = JoinPath([jk2,jk1])
        options.append(ret_jp)


    return options
