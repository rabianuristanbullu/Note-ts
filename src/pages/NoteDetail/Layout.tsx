import { Note } from "../../types/types"
import {useParams , Outlet , Navigate , useOutletContext} from "react-router-dom"


type LayoutProps={
    notes:Note[]
}

const Layout = ({notes}:LayoutProps) => {
    const {id}= useParams()

    const found= notes.find((n)=>n.id == id)

    if(found){
     return   <Outlet context={found} />
    }else{
       return <Navigate to="/" replace/>
    }

}

export function useNote (){
    return useOutletContext<Note>()
}

export default Layout