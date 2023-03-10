import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  CogIcon,
  HeartIcon,
  HomeIcon,
  PhotoIcon,
  PlusIcon as PlusIconOutline,
  RectangleStackIcon,
  Squares2X2Icon as Squares2X2IconOutline,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon as PlusIconMini,
  Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid";
import { classNames } from "../../../../lib/helper";
import { auth } from "../../../../lib/firebase";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../../../context/authContext";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "All Files", href: "#", icon: Squares2X2IconOutline, current: false },
  { name: "Photos", href: "#", icon: PhotoIcon, current: true },
  { name: "Shared", href: "#", icon: UserGroupIcon, current: false },
  { name: "Albums", href: "#", icon: RectangleStackIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "/auth/login" },
];

async function logout(){
  await signOut(auth);
}

export default function DashboardHeader({ setMobileMenuOpen }) {


  const {state} = useContext(AuthContext)

  const fileinputRef = useRef()

  async function onFileChange({target}){
    if(target.files === 0 ) return;
    console.log(target.files);
    const file = target.files[0]
    const cloudUrl = 'https://api.cloudinary.com/v1_1/photos-cloud/upload'

    const formData = new FormData();
    formData.append('upload_preset','react-photos')
    formData.append('file',file)

    try {
      const response = await fetch(cloudUrl,{
        method:'POST',
        body:formData
      });

      console.log(response);

      const cloudResponse = await response.json()
      console.log({cloudResponse});
      return cloudResponse.secure_url

    } catch (error) {
      console.log(error)
    }

  } 

  return (
    <header className="w-full">
      <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex flex-1 justify-between px-4 sm:px-6">
          <div className="flex flex-1">
            <form className="flex w-full md:ml-0" action="#" method="GET">
              <label htmlFor="desktop-search-field" className="sr-only">
                Search all files
              </label>
              <label htmlFor="mobile-search-field" className="sr-only">
                Search all files
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <input
                  name="mobile-search-field"
                  id="mobile-search-field"
                  className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:hidden"
                  placeholder="Search"
                  type="search"
                />
                <input
                  name="desktop-search-field"
                  id="desktop-search-field"
                  className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:block"
                  placeholder="Search all files"
                  type="search"
                />
              </div>
            </form>
          </div>
          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            {/* Profile dropdown */}
            <Menu as="div" className="relative flex-shrink-0">
              <div>
                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      state.user.photoURL ? state.user.photoURL : '/images/custom-user.png'
                    }
                    // "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          onClick={logout}
                          href={item.href}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            <input
            ref={fileinputRef}
            type='file'
            //style={{display:'none'}}
            onChange={onFileChange}
            />
            
            <button
              onClick={()=> fileinputRef.current.click()}
              type="button"
              className="flex items-center justify-center rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Add file</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
