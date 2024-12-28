import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getData, postData } from '../appRoutes';

interface Data {
    id: string;
    name: string;
    age: number;
}

const Home = () => {

    const [data, setdata] = useState<Data[]>([])
    const [formField, setformField] = useState({
        name: "",
        age: 0
    })

    const handleSubmit = () => {
        console.log(formField)
        axios.post(postData, formField)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(getData)
            .then((res) => {
                setdata(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="w-full max-h-full min-h-screen bg-slate-100">
            <div className=' flex flex-col gap-4 items-center justify-center h-screen'>
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <input type='text' name='name' value={formField.name} className=' ' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setformField({ ...formField, name: e.target.value })} />
                    <input type='number' name='age' value={formField.age} className='' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setformField({ ...formField, age: parseInt(e.target.value) || 0 })} />
                    <div>
                        <button className=' bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div>
                    {data.map((data) => (
                        <div key={data.id}>
                            <div>{data.name}</div>
                            <div>{data.age}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
