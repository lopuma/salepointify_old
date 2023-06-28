import React, { useContext } from 'react'
import SidebarContext from '../context/Sidebar/SidebarContext'

const useSidebar = () => {
    return useContext(SidebarContext)
}

export default useSidebar