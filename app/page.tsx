"use client";
import Image from "next/image";
import { FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from 'next/link';


export default function HomePage() {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <motion.div
        className="flex flex-wrap items-center justify-between w-full h-96"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col w-1/2 h-full items-start justify-center p-5 gap-8 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-5xl font-bold">Welcome To Salad Maker Application</h4>
          <Link href="/salad_maker" className="bg-gradient-to-r from-custom_green to-orange-400 py-3 w-64 text-center rounded-full font-bold text-white text-xl">
            Try creating a recipe.
          </Link>
        </motion.div>
        <motion.div
          className="md:flex flex-col w-1/2 h-full hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute z-10 w-56 h-56 top-10 xl:right-96 bg-secondary rounded-xl flex flex-col justify-between items-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -bottom-16 ml-5 transform -translate-x-1/2 w-60 h-60 opacity-45 bg-custom_green rounded-full z-10"></div>
            <div className="absolute -top-16 -ml-20 transform -translate-x-1/2 w-56 h-56 bg-orange-500 rounded-full z-0"></div>
            <div className="w-full h-full p-4 flex flex-col items-center justify-between z-10">
              <div className="w-full h-1/2 p-2 bg-white rounded-xl flex flex-col items-start justify-center font-bold gap-2">
                <h4 className="text-sm text-tertiary">aaaa</h4>
                <div className="flex flex-row items-center gap-2 font-bold">
                  <h4 className="text-2xl">55</h4>
                  <h4 className="text-secondary text-2xl">Cal</h4>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between w-full gap-2">
                <div className="bg-white rounded-full w-1/2 flex flex-row gap-1 justify-center items-center p-2 font-semibold cursor-pointer">
                  <Image src="/assets/icons/trash.png" alt="trash" width={20} height={20} />
                  <h4 className="text-custom_red text-sm">Delete</h4>
                </div>
                <div className="bg-white rounded-full w-1/2 flex flex-row gap-1 justify-center items-center p-2 font-semibold cursor-pointer">
                  <Image src="/assets/icons/edit.png" alt="edit" width={20} height={20} />
                  <h4 className="text-black text-sm">Edit</h4>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-30 w-56 h-56 top-32 xl:right-72 right-20 bg-secondary rounded-xl flex flex-col justify-between items-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -bottom-16 ml-5 transform -translate-x-1/2 w-60 h-60 opacity-45 bg-custom_green rounded-full z-10"></div>
            <div className="absolute -top-16 -ml-20 transform -translate-x-1/2 w-56 h-56 bg-orange-500 rounded-full z-0"></div>
            <div className="w-full h-full p-4 flex flex-col items-center justify-between z-10">
              <div className="w-full h-1/2 p-2 bg-white rounded-xl flex flex-col items-start justify-center font-bold gap-2">
                <h4 className="text-sm text-tertiary">aaaa</h4>
                <div className="flex flex-row items-center gap-2 font-bold">
                  <h4 className="text-2xl">55</h4>
                  <h4 className="text-secondary text-2xl">Cal</h4>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between w-full gap-2">
                <div className="bg-white rounded-full w-1/2 flex flex-row gap-1 justify-center items-center p-2 font-semibold cursor-pointer">
                  <Image src="/assets/icons/trash.png" alt="trash" width={20} height={20} />
                  <h4 className="text-custom_red text-sm">Delete</h4>
                </div>
                <div className="bg-white rounded-full w-1/2 flex flex-row gap-1 justify-center items-center p-2 font-semibold cursor-pointer">
                  <Image src="/assets/icons/edit.png" alt="edit" width={20} height={20} />
                  <h4 className="text-black text-sm">Edit</h4>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-20 w-56 h-56 top- xl:right-20 right-0 bg-secondary rounded-xl flex flex-col justify-between items-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -bottom-16 ml-5 transform -translate-x-1/2 w-60 h-60 opacity-45 bg-custom_green rounded-full z-10"></div>
            <div className="absolute -top-16 -ml-20 transform -translate-x-1/2 w-56 h-56 bg-orange-500 rounded-full z-0"></div>
            <div className="w-full h-full p-4 flex flex-col items-center justify-between z-10">
              <div className="w-full h-1/2 p-2 bg-white rounded-xl flex flex-col items-start justify-center font-bold gap-2">
                <h4 className="text-sm text-tertiary">aaaa</h4>
                <div className="flex flex-row items-center gap-2 font-bold">
                  <h4 className="text-2xl">55</h4>
                  <h4 className="text-secondary text-2xl">Cal</h4>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between w-full gap-2">
                <div className="bg-white rounded-full w-1/2 flex flex-row gap-1 justify-center items-center p-2 font-semibold cursor-pointer">
                  <Image src="/assets/icons/trash.png" alt="trash" width={20} height={20} />
                  <h4 className="text-custom_red text-sm">Delete</h4>
                </div>
                <div className="bg-white rounded-full w-1/2 flex flex-row gap-1 justify-center items-center p-2 font-semibold cursor-pointer">
                  <Image src="/assets/icons/edit.png" alt="edit" width={20} height={20} />
                  <h4 className="text-black text-sm">Edit</h4>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Add similar animation for other elements */}
        </motion.div>
      </motion.div>
      <motion.div
        className="flex flex-wrap items-center justify-between w-full md:h-96 h-96"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative w-full h-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute flex flex-row items-center top-0 right-0 w-full rounded-r-full bg-gradient-to-r from-yellow-500 to-orange-400">
            <motion.div
              className="md:w-1/3 w-full flex-row items-center justify-center lg:flex hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-64 bg-white rounded-xl p-4 flex flex-col justify-center items-center">
                <div className="w-full h-56 lg:h-32 md:h-32 sm:h-56 xl:h-56 relative">
                  <Image
                    src="/assets/ingredients/avocado.png"
                    alt="avocado"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="w-full h-24">
                  <h1 className="mt-3 text-md">avocado</h1>
                  <div className="flex flex-row items-center justify-start gap-2 font-bold">
                    <h4 className="text-lg">45</h4>
                    <h4 className="text-secondary text-lg">Cal</h4>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-3 font-bold">
                    <FaPlusCircle size={24} className="text-secondary cursor-pointer" />
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="grid sm:grid-cols-3 grid-cols-2 sgrid-rows-2 gap-4 md:w-2/3 xl:w-3/6 w-full p-5 mr-10 sm:h-full h-96">
              {/* Add similar animation for each grid item */}
              <motion.div
                className="w-full h-40 xl:w-48 bg-white rounded-xl p-2 flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-16 relative">
                  <Image
                    src="/assets/ingredients/avocado.png"
                    alt="avocado"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="w-full h-16">
                  <h1 className="text-md">avocado</h1>
                  <div className="flex flex-row items-center justify-start gap-2 font-bold">
                    <h4 className="text-lg">45</h4>
                    <h4 className="text-secondary text-lg">Cal</h4>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-3 font-bold">
                    <FaPlusCircle size={24} className="text-secondary cursor-pointer" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="w-full h-40 xl:w-48 bg-white rounded-xl p-2 flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-16 relative">
                  <Image
                    src="/assets/ingredients/bacon.png"
                    alt="bacon"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="w-full h-16">
                  <h1 className="text-md">bacon</h1>
                  <div className="flex flex-row items-center justify-start gap-2 font-bold">
                    <h4 className="text-lg">45</h4>
                    <h4 className="text-secondary text-lg">Cal</h4>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-3 font-bold">
                    <FaPlusCircle size={24} className="text-secondary cursor-pointer" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="w-full h-40 xl:w-48 bg-white rounded-xl p-2 flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-16 relative">
                  <Image
                    src="/assets/ingredients/crouton.png"
                    alt="crouton"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="w-full h-16">
                  <h1 className="text-md">crouton</h1>
                  <div className="flex flex-row items-center justify-start gap-2 font-bold">
                    <h4 className="text-lg">45</h4>
                    <h4 className="text-secondary text-lg">Cal</h4>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-3 font-bold">
                    <FaPlusCircle size={24} className="text-secondary cursor-pointer" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="w-full h-40 xl:w-48 bg-white rounded-xl p-2 flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-16 relative">
                  <Image
                    src="/assets/ingredients/cream_dressing.png"
                    alt="cream_dressing"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="w-full h-16">
                  <h1 className="text-md">cream dressing</h1>
                  <div className="flex flex-row items-center justify-start gap-2 font-bold">
                    <h4 className="text-lg">45</h4>
                    <h4 className="text-secondary text-lg">Cal</h4>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-3 font-bold">
                    <FaPlusCircle size={24} className="text-secondary cursor-pointer" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="w-full h-40 xl:w-48 bg-white rounded-xl p-2 sm:flex hidden flex-col justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-16 relative">
                  <Image
                    src="/assets/ingredients/grilled_shrimp.png"
                    alt="grilled_shrimp"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="w-full h-16">
                  <h1 className="text-md">grilled shrimp</h1>
                  <div className="flex flex-row items-center justify-start gap-2 font-bold">
                    <h4 className="text-lg">45</h4>
                    <h4 className="text-secondary text-lg">Cal</h4>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-3 font-bold">
                    <FaPlusCircle size={24} className="text-secondary cursor-pointer" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="w-full h-40 xl:w-48 bg-white rounded-xl p-2 sm:flex hidden flex-col justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-16 relative">
                  <Image
                    src="/assets/ingredients/carrots.png"
                    alt="carrots"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="w-full h-16">
                  <h1 className="text-md">carrots</h1>
                  <div className="flex flex-row items-center justify-start gap-2 font-bold">
                    <h4 className="text-lg">45</h4>
                    <h4 className="text-secondary text-lg">Cal</h4>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-3 font-bold">
                    <FaPlusCircle size={24} className="text-secondary cursor-pointer" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
