import { FC } from 'react'

const EmptyState: FC = () => {
  return (
    <div className="">
      <h1 className="text-4xl font-bold text-white">Welcome to OrbitAI</h1>
      <h2 className="text-white text-xl mt-3">
        OrbitAI is an on-chain AI agent that will help you work with Metis and Hyperion as
        efficiently as possible.
      </h2>
      <div className="flex gap-4 mt-10">
        <p className="text-white text-lg relative">
          Onchain swaps
          <span className="text-blue-500 text-sm align-super ml-1">Live</span>
        </p>
        <p className="text-gray-500 text-lg relative">
          Project aggregator
          <span className="text-gray-500 text-sm align-super ml-1">Soon</span>
        </p>
        <p className="text-gray-500 text-lg relative">
          Information database
          <span className="text-gray-500 text-sm align-super ml-1">Soon</span>
        </p>
      </div>
    </div>
  )
}

export { EmptyState }
