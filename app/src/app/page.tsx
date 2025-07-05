import Image from "next/image";
import Link from "next/link";
import { GoPlus } from 'react-icons/go';
import { GoPersonFill } from "react-icons/go";

export default function Home() {
    return (
        <div className={'w-screen h-screen flex items-center justify-center'}>
            <div className="flex flex-col items-center p-7 justify-evenly rounded-2xl shadow-2xl w-70 border border-gray-300 h-96">
                <div className={' bg-gray-300 w-32 h-32 flex items-center justify-center text-gray-800 rounded-full'}>
                    <GoPersonFill size={80} />
                </div>
                <p className={'font-bold text-gray-600'}>Create new character</p>
                <Link href={'/character/create'} className={'bg-gray-300 hover:bg-gray-400 text-black p-4 rounded-3xl'}>
                    <GoPlus size={'2em'} />
                </Link>
            </div>
        </div>
    );
}
