import React, { Component } from 'react';
import { getList, addItem, deleteItem, updateItem,} from './ListFunctions'


class List extends Component {
    constructor(){
        super();
        this.state={
            id:'',
            title: '',
            editDisable:false,
            items:[]
        }
        this.onSubmit=this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    componentDidMount(){
        console.log('hi');
        this.getAll();
    }
    onChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getAll= e =>{
        getList().then(data=>{
            this.setState({
                title:'',
                items:[...data]
            },()=>{
                console.log(this.state.items)
            })
        })
    }
    onSubmit = e =>{
        e.preventDefault();
        addItem(this.state.title).then(()=>{
            this.getAll();
        })
        this.setState({
            title:''
        })
    }
    onUpdate=e=>{
        e.preventDefault();
        updateItem(this.state.title , this.state.id).then(() => {
            this.getAll();
        })
        this.setState({
            title: '',
            editDisable: '',
        })
        this.getAll();
    }
    onEdit=(itemid,e) =>{
        e.preventDefault();
        var data=[...this.state.items];
        data.forEach((item,index)=>{
            if(item.id===itemid){
                this.setState({
                    id:item.id,
                    title:item.title,
                    editDisable:true
                });
            }
        })
    }
    onDelete=(val,e)=>{
        e.preventDefault();
        deleteItem(val);
        this.getAll();
    }

    render() {
        return (
            <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" 
                                name="title" 
                                id="title" 
                                className="form-control"
                                value={this.state.title || ''}
                                onChange={this.onChange.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                    {!this.state.editDisable ? (
                        <button type="submit" 
                        className="btn btn-success btn-block"
                        onClick={this.onSubmit.bind(this)}
                        >Submit</button>
                    ):(
                        ''
                    )}
                    {this.state.editDisable ? (
                        <button type="submit"
                            className="btn btn-success btn-block"
                            onClick={this.onUpdate.bind(this)}
                        >Update</button>
                    ) : (
                            ''
                        )}

                </form>
                <table className="table">
                    <tbody>
                        {this.state.items.map((item,index)=>(
                            <tr key={index}>
                                <td className="text-left">{item.title}</td>
                                <td className="text-right">
                                    <button
                                        className="btn btn-info mr-1"
                                        disabled={this.state.editDisable}
                                        onClick={this.onEdit.bind(this, item.id)}
                                        >
                                   
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                         disabled={this.state.editDisable}
                                        onClick={this.onDelete.bind(this, item.id)}>
                                  
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;