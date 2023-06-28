import SidebarContext from './SidebarContext'
import { useState } from "react";

const SidebarProvider = ({children}) => {
    const [show, setShow] = useState(false);
	const handleShowSidebar = () => setShow(!show);
    const data = {show, handleShowSidebar}
    return (
        <SidebarContext.Provider value={data}>
            {children}
        </SidebarContext.Provider>
    )

}

export default SidebarProvider