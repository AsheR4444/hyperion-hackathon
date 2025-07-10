import { useCallback } from 'react'

import { erc20Abi, parseUnits } from 'viem'
import { useReadContract, useWriteContract } from 'wagmi'

/**
 * Helper to detect whether a token address represents a native currency
 * (LiFi uses 0x000..00 for native).
 */
export function isNativeToken(address: string): boolean {
  return address.toLowerCase() === '0x0000000000000000000000000000000000000000'
}

/**
 * Custom hook for handling ERC-20 token approval workflow
 *
 * @param tokenAddress - Address of the ERC-20 token
 * @param spenderAddress - Address that will be approved to spend tokens (from LiFi response)
 * @param amount - Amount to be approved (as string)
 * @param decimals - Token decimals for amount conversion
 * @param userAddress - User's wallet address
 * @returns Object with approval state and functions
 */
export const useTokenApproval = (
  tokenAddress: string,
  spenderAddress: string | undefined,
  amount: string,
  decimals: number,
  userAddress: string,
) => {
  const isNative = isNativeToken(tokenAddress)

  // Read current allowance from the token contract
  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: 'allowance',
    args: [userAddress as `0x${string}`, spenderAddress as `0x${string}`],
    query: {
      enabled: !isNative && !!spenderAddress && !!userAddress && Number(amount) > 0,
      refetchOnWindowFocus: false,
    },
  })

  // Hook for writing approve transaction
  const {
    writeContract: approveToken,
    isPending: isApproving,
    isError: isApproveError,
    error: approveError,
  } = useWriteContract()

  // Calculate if approval is needed
  const amountBigInt = Number(amount) > 0 ? parseUnits(amount, decimals) : BigInt(0)
  const needsApproval = !isNative && allowance !== undefined && allowance < amountBigInt

  // Execute approval transaction
  const approve = useCallback(async () => {
    if (!spenderAddress || isNative) return

    approveToken({
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: 'approve',
      args: [spenderAddress as `0x${string}`, amountBigInt], // Exact amount approval
    })
  }, [approveToken, tokenAddress, spenderAddress, amountBigInt, isNative])

  return {
    needsApproval,
    approve,
    isApproving,
    isApproveError,
    approveError,
    allowance,
  }
}
