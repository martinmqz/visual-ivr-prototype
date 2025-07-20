
export type IVRNode = {
  id: string
  type: 'greeting' | 'menu' | 'action' | 'transfer' | 'voicemail' | 'hangup'
  message: string
  options?: {
    [key: string]: string; // key: digit, value: next node id
  }
}
