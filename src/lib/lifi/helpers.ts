import { CHAIN_ID_TO_NAME } from './lifi'

const findChainNameById = (id: number): string => {
  return CHAIN_ID_TO_NAME[id]?.charAt(0).toUpperCase() + CHAIN_ID_TO_NAME[id]?.slice(1) || ''
}

export { findChainNameById }
