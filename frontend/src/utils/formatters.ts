import { networkConfig } from '../networkConfig';

export const shortenAddress = (address: string, chars: number = 4): string => {
  if (!address) return '';
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};

export const formatObjectType = (type: string): string => {
  const parts = type.split('::');
  if (parts.length >= 2) {
    return parts[parts.length - 1]; // Return the last part (e.g., "Widget")
  }
  return type;
};

export const formatPrice = (priceInMist: string | number): string => {
  const price = typeof priceInMist === 'string' ? parseFloat(priceInMist) : priceInMist;
  const priceInSui = price / 1_000_000_000;
  return `${priceInSui.toFixed(4)} SUI`;
};

export const parsePrice = (priceInSui: string): number => {
  const price = parseFloat(priceInSui);
  if (isNaN(price) || price <= 0) {
    throw new Error('Invalid price');
  }
  return Math.floor(price * 1_000_000_000); // Convert to MIST
};

export const openInExplorer = (objectId: string): void => {
  window.open(`${networkConfig}/object/${objectId}`, '_blank');
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};