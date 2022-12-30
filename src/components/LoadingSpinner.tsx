export default function LoadingSpinner() {
  return (
    <div className="inline-block relative w-8 h-8">
      <div className="absolute border-2	border-white opacity-100 rounded-[50%] animate-[ripple_1s_cubic-bezier(0,0.2,0.8,1)_infinite]" />
      <div className="absolute border-2	border-white opacity-100 rounded-[50%] animate-[ripple_1s_cubic-bezier(0,0.2,0.8,1)_-0.5s_infinite]" />
    </div>
  )
}
