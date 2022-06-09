import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormDataCtxt from "./utils/formData";
import { useState } from "react";
import Input from "./pages/Input";
import Results from "./pages/Results";

const App = () => {
    
    const [formData, setFormData] = useState({
        file: null,
        task: 1,
        classification: 1,
        utilityMetric: 1,
        attribute: 1,
        dataset: null,
        matches: []
    })

    return (
        <BrowserRouter>

            <FormDataCtxt.Provider value={[ formData, setFormData ]}>
                <Routes>
                    <Route path="/" element={<Input />} />
                    <Route path="/results" element={<Results />} />
                </Routes>
            </FormDataCtxt.Provider>

          </BrowserRouter>
    )

}

export default App;