const sendWSSMessage = (message, regex, clients, ws) => {
  const newMessage = message.replace(regex, '')
  clients.forEach(client => {
    // eslint-disable-next-line no-console
    if (client !== ws) {
      client.send(newMessage)
    }
  })
}

export default sendWSSMessage
