import React from 'react'
import Input from './Input'
import { Web3Context, errorParser } from '@/app/Web3Context'
import Button from './Button'
import { toast } from 'react-toastify'

export default function GetResidentByName() {
    const [name, setName] = React.useState<string>("")
    const { findResidentByName } = React.useContext(Web3Context)
    const [resident, setResident] = React.useState<any>(null)


    return (
        <div className="flex w-full flex-col">
            <div className="flex w-full ">
                <h1 className="text-xl font-bold">Find Resident By Name</h1>
            </div>
            <div className="flex w-full justify-center">
                <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} name='name' />
            </div>
            <div className="flex w-full  justify-center">
                <Button className='w-full' onClick={() => {
                    findResidentByName(name).then((resident) => {
                        console.log("the resident", resident);
                        setResident(resident)
                    }).catch((err: any) => {
                        console.log("the err", err);
                        toast.error(errorParser(err))
                    })
                }}>Find Resident</Button>
            </div>
            {resident && <ResidentItem resident={resident} />}
        </div>
    )
}


const ResidentItem = ({ resident }: { resident: any }) => {
    return <table className="table-auto w-full">
        <thead>
            <tr>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Address</th>
                <th className="border border-gray-400 px-4 py-2">Age</th>
                <th className="border border-gray-400 px-4 py-2">Tax Dept</th>
            </tr>
        </thead>
        <tbody>
            <td className="border border-gray-400 px-4 py-2">{resident.name}</td>
            <td className="border border-gray-400 px-4 py-2">{resident.addr.street}, {resident.addr.city}, {resident.addr.state}, {parseInt(resident.addr.zip)}</td>
            <td className="border border-gray-400 px-4 py-2">{parseInt(resident.age)}</td>
            <td className="border border-gray-400 px-4 py-2">{parseInt(resident.taxDept)}</td>
        </tbody>
    </table>
}