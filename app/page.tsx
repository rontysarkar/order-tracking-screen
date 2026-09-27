'use client'

import { useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Headphones,
  MapPin,
  Package,
  RefreshCw,
  Truck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type Scenario = 'delayed' | 'delivered' | 'unavailable' | 'loading' | 'error'

type OrderData = {
  title: string
  eyebrow: string
  detail: string
  tone: 'warning' | 'success' | 'neutral'
  step: number
  date: string
  time: string
  product: string
  variant: string
  quantity: number
  price: string
  orderId: string
  message: string
}

const orders: Record<Scenario, OrderData> = {
  delayed: {
    title: 'Your order is delayed',
    eyebrow: 'Delivery update',
    detail: 'We are sorry — your package is taking a little longer than expected.',
    tone: 'warning',
    step: 2,
    date: 'Tuesday, 18 June',
    time: 'by 8:00 PM',
    product: 'CloudRun Everyday Sneakers',
    variant: 'Sage / Size 8',
    quantity: 1,
    price: '$89.00',
    orderId: '#FR-20481',
    message: 'The carrier has been notified. We will keep you posted with the next scan.',
  },
  delivered: {
    title: 'Marked as delivered',
    eyebrow: 'Delivery complete',
    detail: 'Your order was delivered today at 2:14 PM.',
    tone: 'success',
    step: 4,
    date: 'Delivered today',
    time: 'at 2:14 PM',
    product: 'CloudRun Everyday Sneakers',
    variant: 'Sage / Size 8',
    quantity: 1,
    price: '$89.00',
    orderId: '#FR-20481',
    message: 'Can’t find your package? Check around your entrance or with a neighbour first.',
  },
  unavailable: {
    title: 'Tracking is on its way',
    eyebrow: 'Order confirmed',
    detail: 'Your order is confirmed. Tracking details will appear as soon as it ships.',
    tone: 'neutral',
    step: 0,
    date: 'Estimated delivery',
    time: '22–24 June',
    product: 'CloudRun Everyday Sneakers',
    variant: 'Sage / Size 8',
    quantity: 1,
    price: '$89.00',
    orderId: '#FR-20481',
    message: 'We will send you an update as soon as your package is handed to the carrier.',
  },
  loading: {
    title: 'Loading your order',
    eyebrow: 'Please wait',
    detail: 'We are fetching the latest delivery updates for you.',
    tone: 'neutral',
    step: 0,
    date: 'Checking delivery estimate',
    time: 'One moment',
    product: 'CloudRun Everyday Sneakers',
    variant: 'Sage / Size 8',
    quantity: 1,
    price: '$89.00',
    orderId: '#FR-20481',
    message: 'Your order details will appear here shortly.',
  },
  error: {
    title: 'We could not load tracking',
    eyebrow: 'Something went wrong',
    detail: 'Your order is safe, but the tracking service is temporarily unavailable.',
    tone: 'warning',
    step: 0,
    date: 'Tracking unavailable',
    time: 'Please try again',
    product: 'CloudRun Everyday Sneakers',
    variant: 'Sage / Size 8',
    quantity: 1,
    price: '$89.00',
    orderId: '#FR-20481',
    message: 'Retry now or contact support if the issue continues.',
  },
}

const steps = [
  { label: 'Processing', icon: Package },
  { label: 'Shipped', icon: Truck },
  { label: 'Out for delivery', icon: MapPin },
  { label: 'Delivered', icon: Check },
]

export default function Page() {
  const [scenario, setScenario] = useState<Scenario>('delayed')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [supportSent, setSupportSent] = useState(false)
  const order = orders[scenario]

  const switchScenario = (next: Scenario) => {
    setScenario(next)
    setDetailsOpen(false)
    setSupportSent(false)
  }

  const actionLabel = scenario === 'delivered' ? 'Report a delivery issue' : 'Contact support'

  return (
    <main className="min-h-screen bg-[#f6f7f5] text-[#202522]">
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-[#f6f7f5] px-5 pb-10 pt-5 sm:px-6">
        <header className="flex items-center justify-between">
          <button aria-label="Go back" className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-[#e9eee9]">
            <ArrowLeft className="size-[18px]" />
          </button>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a928d]">Order tracking</p>
            <p className="mt-1 text-xs font-semibold text-[#55605a]">{order.orderId}</p>
          </div>
          <button aria-label="Get help" className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-[#e9eee9]">
            <CircleHelp className="size-[18px] text-[#53625a]" />
          </button>
        </header>

        <nav aria-label="Demo scenarios" className="mt-5 flex gap-1.5 overflow-x-auto rounded-2xl bg-[#e7ece7] p-1">
          {(['delayed', 'delivered', 'unavailable', 'loading', 'error'] as Scenario[]).map((item) => (
            <button
              key={item}
              onClick={() => switchScenario(item)}
              className={`min-w-max flex-1 rounded-xl px-2 py-2 text-[11px] font-bold capitalize transition ${scenario === item ? 'bg-white text-[#315d48] shadow-sm' : 'text-[#748078] hover:text-[#315d48]'}`}
            >
              {item === 'unavailable' ? 'Not available' : item}
            </button>
          ))}
        </nav>

        {scenario === 'loading' ? (
          <section className="mt-7 flex flex-col gap-4" aria-live="polite" aria-label="Loading order tracking">
            <div className="h-3 w-28 animate-pulse rounded-full bg-[#dce5de]" />
            <div className="h-20 w-4/5 animate-pulse rounded-2xl bg-[#dce5de]" />
            <div className="rounded-[22px] bg-white p-5 shadow-[0_8px_28px_rgba(36,55,42,0.06)]">
              <div className="h-4 w-36 animate-pulse rounded bg-[#e5ece6]" />
              <div className="mt-5 h-24 animate-pulse rounded-2xl bg-[#f0f4f0]" />
              <p className="mt-4 text-center text-xs font-medium text-[#748078]">Loading the latest tracking update...</p>
            </div>
          </section>
        ) : scenario === 'error' ? (
          <section className="mt-7" aria-live="assertive">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a06e28]">{order.eyebrow}</p>
            <h1 className="mt-2 text-[30px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#253029]">{order.title}</h1>
            <div className="mt-6 rounded-[22px] border border-[#f1d9a6] bg-[#fff8e8] p-5">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#f7d994] text-[#825d16]"><AlertCircle className="size-5" /></div>
              <p className="mt-4 text-sm font-bold text-[#344139]">Tracking is temporarily unavailable</p>
              <p className="mt-2 text-sm leading-6 text-[#69746d]">{order.detail}</p>
              <Button onClick={() => setScenario('loading')} className="mt-5 h-11 w-full rounded-xl bg-[#315d48] text-sm font-bold text-white hover:bg-[#274d3b]"><RefreshCw data-icon="inline-start" />Retry tracking</Button>
              <p className="mt-3 text-center text-xs text-[#7d867f]">If this keeps happening, contact support for help.</p>
            </div>
          </section>
        ) : (
          <>
        <section className="mt-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#839088]">{order.eyebrow}</p>
          <h1 className="mt-2 max-w-[330px] text-[30px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#253029]">{order.title}</h1>
          <p className="mt-3 max-w-[350px] text-sm leading-6 text-[#69746d]">{order.detail}</p>
        </section>

        <section className={`mt-6 rounded-[22px] border p-4 ${order.tone === 'warning' ? 'border-[#f1d9a6] bg-[#fff8e8]' : order.tone === 'success' ? 'border-[#cce6d5] bg-[#eff9f1]' : 'border-[#d9e3dc] bg-[#f1f6f2]'}`}>
          <div className="flex items-start gap-3">
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${order.tone === 'warning' ? 'bg-[#f7d994] text-[#825d16]' : order.tone === 'success' ? 'bg-[#c9e8d1] text-[#28623d]' : 'bg-[#d8e8dc] text-[#3e7350]'}`}>
              {order.tone === 'warning' ? <Clock3 className="size-[17px]" /> : order.tone === 'success' ? <Check className="size-[17px]" /> : <RefreshCw className="size-[17px]" />}
            </div>
            <div>
              <p className="text-sm font-bold text-[#344139]">{order.date}</p>
              <p className="mt-0.5 text-xs text-[#69756d]">{order.time}</p>
            </div>
          </div>
          <p className="mt-3 border-t border-black/5 pt-3 text-xs leading-5 text-[#657168]">{order.message}</p>
        </section>

        <section className="mt-6 rounded-[22px] bg-white p-5 shadow-[0_8px_28px_rgba(36,55,42,0.06)]" aria-label="Delivery progress">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#354139]">Delivery progress</h2>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${order.tone === 'warning' ? 'bg-[#fff1cc] text-[#8b671e]' : order.tone === 'success' ? 'bg-[#e0f4e5] text-[#377047]' : 'bg-[#e7f0e9] text-[#4d7559]'}`}>
              {order.step === 0 ? 'Confirmed' : order.step === 4 ? 'Complete' : 'In transit'}
            </span>
          </div>
          <div className="relative flex justify-between">
            <div className="absolute left-[7%] right-[7%] top-4 h-px bg-[#e2e8e3]" aria-hidden="true" />
            <div className={`absolute left-[7%] top-4 h-px bg-[#74a687] transition-all ${order.step === 0 ? 'w-0' : order.step === 1 ? 'w-[28%]' : order.step === 2 ? 'w-[61%]' : 'w-[86%]'}`} aria-hidden="true" />
            {steps.map((step, index) => {
              const Icon = step.icon
              const completed = order.step >= index + 1
              const active = order.step === index + 1
              return (
                <div className="relative z-10 flex w-1/4 flex-col items-center gap-2 text-center" key={step.label}>
                  <div className={`flex size-8 items-center justify-center rounded-full border-[3px] transition ${completed ? 'border-[#74a687] bg-[#74a687] text-white' : active ? 'border-[#4e8a67] bg-white text-[#4e8a67]' : 'border-[#e2e8e3] bg-white text-[#aab4ad]'}`}>
                    <Icon className="size-3.5" />
                  </div>
                  <span className={`text-[10px] font-semibold leading-3 ${active ? 'text-[#356747]' : completed ? 'text-[#52655a]' : 'text-[#98a39b]'}`}>{step.label}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-4 rounded-[22px] bg-white p-4 shadow-[0_8px_28px_rgba(36,55,42,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#354139]">Order summary</h2>
            <span className="text-xs font-medium text-[#8a948d]">1 item</span>
          </div>
          <div className="mt-4 flex gap-3">
            <div className="flex size-[74px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#f0eee8]">
              <img src="/product-sneakers.png" alt="Off-white and sage CloudRun sneaker" className="size-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[#344139]">{order.product}</p>
              <p className="mt-1 text-xs text-[#8a948d]">{order.variant}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-[#7a857d]">Qty {order.quantity}</span>
                <span className="text-sm font-bold text-[#344139]">{order.price}</span>
              </div>
            </div>
          </div>
          <button onClick={() => setDetailsOpen(!detailsOpen)} className="mt-4 flex w-full items-center justify-center gap-1 border-t border-[#edf0ed] pt-3 text-xs font-bold text-[#4b765b]">
            {detailsOpen ? 'Hide order details' : 'View order details'}
            <ChevronDown className={`size-3.5 transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
          </button>
          {detailsOpen && <div className="mt-3 rounded-xl bg-[#f6f8f6] p-3 text-xs leading-5 text-[#758078]"><p>Placed on 14 June 2024</p><p>Delivery address: 24 Greenway Ave, Portland</p></div>}
        </section>

        <section className="mt-5 rounded-[22px] border border-[#dce6de] bg-[#eef5ef] p-4">
          {supportSent ? (
            <div className="flex items-center gap-3 text-sm font-semibold text-[#356747]"><Check className="size-5" /> We&apos;ll connect you with support shortly.</div>
          ) : (
            <>
              <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-full bg-white text-[#4f7c5e]"><Headphones className="size-4" /></div><div><p className="text-sm font-bold text-[#354139]">Need a hand?</p><p className="mt-0.5 text-xs text-[#728078]">Our delivery team is here to help.</p></div></div>
              <Button onClick={() => setSupportSent(true)} className="mt-4 h-10 w-full rounded-xl bg-[#315d48] text-sm font-bold text-white hover:bg-[#274d3b]"><Headphones data-icon="inline-start" />{actionLabel}<ChevronRight data-icon="inline-end" /></Button>
            </>
          )}
        </section>

        {scenario === 'delivered' && <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-[#8a948d]"><AlertCircle className="size-3.5" /> We&apos;ll help investigate within 24 hours.</p>}
          </>
        )}
      </div>
    </main>
  )
}
