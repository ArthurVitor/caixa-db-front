import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CashierService from '../../services/CashierService';
import CashierDto from '../../dto/CashierDto';
import CashierCard from './CashierCard';

interface CashierDetailsPageProps {}

const CashierDetailsPage: React.FC<CashierDetailsPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [cashier, setCashier] = useState<CashierDto | null>(null);

  useEffect(() => {
    const fetchCashierDetails = async () => {
      try {
        const cashierDetails = await CashierService.getById(Number(id));
        setCashier(cashierDetails);
      } catch (error) {
        console.error('Erro ao obter detalhes do caixa:', error);
      }
    };

    fetchCashierDetails();
  }, [id]);
  
  return (
    <>
     {cashier ? <CashierCard cashier={cashier} /> : <p>Carregando...</p>}
    </>
  );
};

export default CashierDetailsPage;
