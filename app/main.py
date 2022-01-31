import sys
from json import loads, dumps
from struct import pack, unpack
from subprocess import run

def get_message():
    rawLength = sys.stdin.buffer.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = unpack('@I', rawLength)[0]
    message = sys.stdin.buffer.read(messageLength).decode('utf-8')
    return loads(message)

def encode_message(messageContent):
    encodedContent = dumps(messageContent).encode('utf-8')
    encodedLength = pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

def send_message(encodedMessage):
    sys.stdout.buffer.write(encodedMessage['length'])
    sys.stdout.buffer.write(encodedMessage['content'])
    sys.stdout.buffer.flush()

while True:
    receivedMessage = get_message()
    if receivedMessage == "ping":
        send_message(encode_message("pong3"))
    else:
        send_message(encode_message(receivedMessage))
        run(receivedMessage)
        # sendMessage(encodeMessage("done"))