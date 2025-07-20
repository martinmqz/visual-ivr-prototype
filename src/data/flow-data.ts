import type { IVRNode } from "../types";

// Sample flow
  const flowData = [
    {
      id: '1',
      type: 'greeting',
      message: 'Thank you for calling MM Corp. Please select an option:',
      options: {
        '1': '2',
        '2': '3',
        '3': '4'
      }
    },
    {
      id: '2',
      type: 'menu',
      message: 'For sales, press 1. For support, press 2. To repeat, press 9.',
      options: {
        '1': '5',
        '2': '6',
        '9': '1'
      }
    },
    {
      id: '3',
      type: 'action',
      message: 'Please hold while we connect you to our customer service department.'
    },
    {
      id: '4',
      type: 'voicemail',
      message: 'Please leave your message after the tone.'
    },
    {
      id: '5',
      type: 'transfer',
      message: 'Connecting you to our sales department.'
    },
    {
      id: '6',
      type: 'transfer',
      message: 'Connecting you to our support team.'
    }
  ] as IVRNode[]

  export { flowData }