import { useCallback, useState, useEffect } from 'react';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

import NavbaItem from "./NavbaItem ";
import MobileMenu from "./MobileMenu";
import AccountMenu from './AccountMenu';

const TOP_OFFSET = 66;


const Navbar = () => {
    const [showMobileMenu, setShowMobileMenue] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          console.log(window.scrollY)
          if (window.scrollY >= TOP_OFFSET) {
            setShowBackground(true)
          } else {
            setShowBackground(false)
          }
        }
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        }
      }, []);


    const toggleMobilMenu = useCallback(() => {
        setShowMobileMenue((current) => !current);
    }, []);
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);
    return (
        <nav className="w-full fixed z-40">
            <div
            className={`
              px-4
              md:px-16
              pay-6
              flex
              flex-row
              items-center
              transition
              duration-500
              ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
            `}
            >
                <img className="h-6 lg:h-7" src="/images/logo.png" alt="logo" />
                <div
                className="
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex
                "
                >
                    <NavbaItem label="Home" />
                    <NavbaItem label="Series" />
                    <NavbaItem label="Films" />
                    <NavbaItem label="New & Popular" />
                    <NavbaItem label="My List" />
                    <NavbaItem label="Browse by Languages" />
                </div>
                <div onClick={toggleMobilMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate': 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className='flex flex-row ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover: text-gray-300 cursor-pointer transition'>
                        <BsSearch />
                    </div>
                    <div className='text-gray-200 hover: text-gray-300 cursor-pointer transition'>
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className='flex flex-row items-center gap-2 cursor-pointer relative'>
                        <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                            <img src='/images/default-blue.png' alt='' />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>

                </div>
            </div>

           
        </nav>
    )
}

export default Navbar;