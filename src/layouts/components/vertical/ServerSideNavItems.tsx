// ** React Imports
import { useEffect, useState } from 'react'

// ** Axios Import
import axios from 'axios'

// ** Type Import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState<VerticalNavItemsType>([])

  useEffect(() => {
    // axios.get('/api/vertical-nav/data').then(response => {
    //   const menuArray = response.data

    //   setMenuItems(menuArray)
    // })
    setMenuItems([
      {
        title: 'Home',
        path: '/home',
        icon: 'mdi:home-outline',
      },
      {
        title: 'Second Page',
        path: '/second-page',
        icon: 'mdi:email-outline',
      },
      {
        path: '/acl',
        action: 'read',
        subject: 'acl-page',
        title: 'Access Control',
        icon: 'mdi:shield-outline',
      }
    ]);
  }, [])

  return { menuItems }
}

export default ServerSideNavItems
