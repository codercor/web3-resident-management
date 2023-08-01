import { Web3Context, errorParser } from '@/app/Web3Context'
import React, { useContext } from 'react'
import { toast } from "react-toastify";

export default function ResidentsList() {
    const { getAllResidents, residents } = useContext(Web3Context)
    React.useEffect(() => {
        getAllResidents()
    }, [])
    return (
        <div className="flex w-full flex-col">
            <div className="flex w-full justify-center">
                <h1 className="text-2xl font-bold">Residents List</h1>
            </div>
            <div className="flex w-full justify-center">
                <table className="table-auto w-full">
                    <tbody>
                        {residents.map((walletAddress) => <ResidentItem walletAddress={walletAddress} key={walletAddress} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const ResidentItem = ({ walletAddress }: { walletAddress: string }) => {
    const { getResident } = useContext(Web3Context)
    const [resident, setResident] = React.useState<any>()
    const [isShow, setIsShow] = React.useState<boolean>(false)
    return (<tr>
        <td className="border border-gray-400 px-4 py-2">
            <button
                onClick={() => {
                    if (isShow) { setIsShow(false); return; }
                    getResident(walletAddress).then((resident: any) => {
                        console.log("the resident", resident);
                        setResident(resident)
                        setIsShow(true)
                    }).catch((err: any) => {
                        toast.error(errorParser(err.message))
                    })
                }}
            > {walletAddress}</button>
            {(resident && isShow) && (<table className="table-auto w-full">
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
            </table>)}
        </td>
    </tr>)
}