import { MagnifyingGlassPlus } from "phosphor-react"
import * as Dialog from '@radix-ui/react-dialog'


export function CreateAdBanner(){
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
    <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
        <div>
        <strong className='text-2xl font-bold text-white block'>Não encontrou seu duo?</strong>
        <span className='text-zinc-300 block'>Publique um anúncio para encontrar novos players!</span>
        </div>
        <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex item-center  gap-3'>
        < MagnifyingGlassPlus size={24}/>
        Publicar Anúncio
        </Dialog.Trigger>
    </div>
    </div>
    )
}