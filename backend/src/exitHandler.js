const exitHandler = (options) => {
  if (options.cleanup) console.log('clean up and shut down...')
  if (options.exit) process.exit()
}

process.on('SIGCONT', () => {
  console.log('do things here')
})

process.on('exit', () => {
  exitHandler({ cleanup: true })
})

process.on('SIGTERM', () => {
  exitHandler({ exit: true })
})

process.on('SIGINT', () => {
  exitHandler({ exit: true })
})

process.on('SIGUSR1', () => {
  exitHandler({ exit: true })
})

process.on('SIGUSR2', () => {
  exitHandler({ exit: true })
})

// Do not use kill -9 node native bug in Mac.
// process.on('SIGKILL', () => {
//   console.log('SIGKILL')
// })