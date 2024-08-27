{/* <button className='text-white'
          onClick={() => {
            if (currentPrice !== null) {
              writeContract({
                abi: WNW_ABI,
                address: WNW_PRECOMPILE_ADDRESS,
                functionName: 'endGame',
                args: [
                  game.gameId,
                  Math.floor(currentPrice * 10 ** 18)
                ]
              });
            } else {
              console.log("Current price is not available yet");
            }
          }}
        >
          End
      </button> */}