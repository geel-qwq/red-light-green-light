"use client";

import { useState } from 'react'
import { updateInventoryQuantity } from '@/actions/inventory'
import { AlertTriangle } from 'lucide-react'

interface Item {
  id: string
  name: string
  description: string | null
  sku: string
  quantity: number
  unit: string
  minStock: number
  _count: { logs: number }
}

interface Props {
  items: Item[]
}

export default function InventoryClient({ items }: Props) {
  const [data, setData] = useState(items)
  const [adjusting, setAdjusting] = useState<string | null>(null)
  const [adjustQty, setAdjustQty] = useState(0)
  const [note, setNote] = useState('')

  async function handleAdjust(itemId: string, change: number) {
    try {
      const result = await updateInventoryQuantity(itemId, change, note || `Adjusted by ${change > 0 ? '+' : ''}${change}`)
      setData((prev) => prev.map((i) => i.id === itemId ? { ...i, quantity: result.quantity } : i))
      setAdjusting(null)
      setAdjustQty(0)
      setNote('')
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Error updating stock')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => {
        const lowStock = item.quantity <= item.minStock
        return (
          <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{item.sku}</p>
              </div>
              <div className={`text-right ${lowStock ? 'text-red-500' : 'text-gray-700'}`}>
                <span className="text-2xl font-bold">{item.quantity}</span>
                <span className="text-xs text-gray-400 ml-1">{item.unit}</span>
              </div>
            </div>
            {item.description && (
              <p className="text-xs text-gray-500 mb-3">{item.description}</p>
            )}
            {lowStock && (
              <p className="text-[10px] text-red-500 font-medium mb-2 inline-flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Low stock (min: {item.minStock})</p>
            )}

            {adjusting === item.id ? (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <input
                  type="number"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Quantity"
                />
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Note (optional)"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAdjust(item.id, adjustQty)}
                    className="flex-1 px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                  >
                    + Add
                  </button>
                  <button
                    onClick={() => handleAdjust(item.id, -adjustQty)}
                    className="flex-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                  >
                    - Use
                  </button>
                  <button
                    onClick={() => { setAdjusting(null); setAdjustQty(0); setNote('') }}
                    className="px-3 py-1.5 bg-gray-100 text-gray-500 text-xs rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAdjusting(item.id)}
                className="w-full mt-2 px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
              >
                Adjust Stock
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
