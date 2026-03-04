import { useState } from 'react'

type ObjectType = 'flat' | 'house' | 'small_office' | 'medium_office'

function Calculator() {
  const [objectType, setObjectType] = useState<ObjectType>('flat')
  const [works, setWorks] = useState<string[]>([])
  const [price, setPrice] = useState<number>(0)

  const basePrices: Record<ObjectType, number> = {
    flat: 5000,
    house: 10000,
    small_office: 15000,
    medium_office: 30000,
  }

  const workPrices: Record<string, number> = {
    wifi: 3000,
    cable: 4000,
    cctv: 15000,
    server: 10000,
  }

  const handleCheckbox = (value: string) => {
    setWorks(prev =>
      prev.includes(value)
        ? prev.filter(w => w !== value)
        : [...prev, value],
    )
  }

  const calculate = () => {
    let total = basePrices[objectType]

    works.forEach(work => {
      total += workPrices[work] || 0
    })

    setPrice(total)
  }

  return (
    <section>
      <h2>Калькулятор</h2>

      <select
        value={objectType}
        onChange={e => setObjectType(e.target.value as ObjectType)}
      >
        <option value="flat">Квартира</option>
        <option value="house">Дом</option>
        <option value="small_office">Малый офис</option>
        <option value="medium_office">Средний офис</option>
      </select>

      <div>
        {['wifi', 'cable', 'cctv', 'server'].map(work => (
          <label key={work}>
            <input
              type="checkbox"
              checked={works.includes(work)}
              onChange={() => handleCheckbox(work)}
            />
            {work}
          </label>
        ))}
      </div>

      <button onClick={calculate}>Рассчитать</button>

      <h3>{price.toLocaleString('ru-RU')} ₽</h3>
    </section>
  )
}

export default Calculator