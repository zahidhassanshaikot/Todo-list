import axios from 'axios';

export const getList=()=>{
    return axios
        .get(`http://localhost:8000/api/task`,{
        headers:{'Content-Type':'application/json'}
    })
    .then(res=>{
        return res.data
    })
}

export const addItem=title=>{
    return axios
        .post(`http://localhost:8000/api/task`,
        {
            title: title
        },
        {
            headers:{'Content-Type':'application/json'}
        }
    )
    .then(res=>{
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
}

export const deleteItem=id=>{
    axios.delete(`http://localhost:8000/api/task/${id}`,
        
        {
            headers:{'Content-Type':'application/json'}
        }
    )
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })
}

export const updateItem=(title,id)=>{
    return axios
        .put(`http://localhost:8000/api/task/${id}`,
        {
            title: title
        },
        {
            headers:{'Content-Type':'application/json'}
        }
    )
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })
};