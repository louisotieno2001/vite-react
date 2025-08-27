import { apiClient } from './api';

interface InitializePaymentResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

const initializePayment = async (
  projectId: number,
  planType: 'ONETIME' | 'MONTHLY' | 'YEARLY',
  currency: string
): Promise<InitializePaymentResponse> => {
  const response = await apiClient.post('/payments/initialize/', {
    project_id: projectId,
    plan_type: planType,
    currency: currency,
    deployment_option: 'APPLAUSE' // Example, this should be dynamic
  });
  return response.data;
};

const getLocalizedPricing = async (country: string) => {
  const response = await apiClient.get(`/payments/pricing/?country=${country}`);
  return response.data;
};

export default {
  initializePayment,
  getLocalizedPricing,
};
