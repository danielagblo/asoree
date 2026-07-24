import { env } from '../config/env'

const PAYSTACK_API = 'https://api.paystack.co'

interface PaystackInitResponse {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

interface PaystackVerifyResponse {
  status: boolean
  message: string
  data: {
    status: string
    reference: string
    amount: number
    gateway_response: string
  }
}

export class PaystackService {
  async initializeTransaction(email: string, amount: number, reference: string) {
    const res = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100),
        reference,
        currency: env.paystackCurrency,
      }),
    })

    const data = (await res.json()) as PaystackInitResponse
    if (!data.status) throw new Error(`Paystack init failed: ${data.message}`)

    return {
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
      reference: data.data.reference,
    }
  }

  async verifyTransaction(reference: string) {
    const res = await fetch(`${PAYSTACK_API}/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${env.paystackSecretKey}`,
      },
    })

    const data = (await res.json()) as PaystackVerifyResponse
    if (!data.status) throw new Error(`Paystack verify failed: ${data.message}`)

    return {
      paid: data.data.status === 'success',
      status: data.data.status,
      gatewayResponse: data.data.gateway_response,
    }
  }
}
