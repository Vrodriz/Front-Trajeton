'use client';

import React, { useState } from 'react';
import { CiSearch, CiViewList, CiUser } from "react-icons/ci";
import { IoHomeOutline, IoSchoolOutline } from "react-icons/io5";
import { MdOutlineRequestPage } from "react-icons/md";
import { FiBox } from "react-icons/fi";

const Dashboard: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userName = "ADM USUÁRIO";
  const profileImage = "icon.png";

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-900 p-4 shadow-md mb-4 flex items-center justify-between">
        <button 
          className="md:hidden text-white mr-4" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <img
          src="/LogoMobile.png"
          alt="Logo"
          className="h-[80px] md:h-[150px] rounded-xl mr-4"
        />
        
        <div className="relative w-full hidden md:block">
          <input
            type="text"
            placeholder="Pesquise aqui"
            className="w-[1130px] p-2 border rounded-2xl"
          />
          <CiSearch className="absolute w-6 h-6 top-1/2 right-3 transform -translate-y-1/2 text-blue-800" />
        </div>

        <div className="flex items-center mr-[200px]">
          <img
            src={profileImage}
            alt="Profile"
            className="h-10 w-10 md:h-20 md:w-20 rounded-full"
          />
          <span className="text-white font-semibold ml-20">{userName}</span>
        </div>
      </header>

      <div className="flex flex-1">
        <aside 
          className={`bg-white p-4 shadow-md transition-all duration-300 ease-in-out ${menuOpen ? 'w-64' : 'w-16'}`}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <ul>
            <li className="mb-2 flex items-center">
              <IoHomeOutline className="text-[30px] text-gray-500 hover:text-blue-500" />
              {menuOpen && <span className="ml-4">Home</span>}
            </li>
            <li className="mb-2 flex items-center">
              <FiBox className="text-[30px] text-gray-500 hover:text-blue-500" />
              {menuOpen && <span className="ml-4">Estoque</span>}
            </li>
            <li className="mb-2 flex items-center">
              <IoSchoolOutline className="text-[30px] text-gray-500 hover:text-blue-500" />
              {menuOpen && <span className="ml-4">Listas Escolares</span>}
            </li>
            <li className="mb-2 flex items-center">
              <MdOutlineRequestPage className="text-[30px] text-gray-500 hover:text-blue-500" />
              {menuOpen && <span className="ml-4">Solicitações</span>}
            </li>
            <li className="mb-2 flex items-center">
              <CiUser className="text-[30px] text-gray-500 hover:text-blue-500" />
              {menuOpen && <span className="ml-4">Usuário</span>}
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-6">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <CiViewList className='text-[70px] text-orange-500 mt-4' />
              <h3 className="text-lg font-semibold mt-2">Pedidos</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <FiBox className='text-[70px] text-green-400 mt-4' />
              <h3 className="text-lg font-semibold mt-2">Estoque</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <IoSchoolOutline className='text-[70px] text-yellow-400 mt-4' />
              <h3 className="text-lg font-semibold mt-2">Listas Escolares</h3>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md h-[400px] flex items-center">
              <img src="Mascote.jpeg" alt="" className="w-2/4 h-auto mr-4" />
              <div>
                <p className='text-2xl text-gray-500'>Hoje</p>
                <p className="text-[60px] font-black text-blue-900">100</p>
                <h4 className="text-xl text-gray-500">Pedidos para entrega</h4>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md h-[200px]'>
              <p className='text-2xl text-gray-500'>Total</p>
              <p className="text-[60px] font-black text-blue-900">100</p>
              <h4 className="text-xl text-gray-500">Produtos</h4>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md h-[200px]'>
              <p className='text-2xl text-gray-500'>Total</p>
              <p className="text-[60px] font-black text-blue-900">10</p>
              <h4 className="text-xl text-gray-500">Novos clientes</h4>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md h-[200px]'>
              <p className='text-2xl text-gray-500'>Total</p>
              <p className="text-[60px] font-black text-red-500">2</p>
              <h4 className="text-xl text-gray-500">Estoque mínimo</h4>
            </div>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <input
                type="text"
                placeholder="Pesquise aqui"
                className="p-2 border rounded mb-4 md:mb-0 md:w-1/3"
              />
              <button className="bg-blue-500 text-white p-2 rounded">Filtrar</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Núm. Pedido</th>
                    <th className="text-left p-2">Valor</th>
                    <th className="text-left p-2">Data</th>
                    <th className="text-left p-2">Forma de pagamento</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">123456</td>
                    <td className="p-2">R$200,00</td>
                    <td className="p-2">22/04/2024</td>
                    <td className="p-2">Dinheiro</td>
                    <td className="p-2">Entregue</td>
                    <td className="p-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
