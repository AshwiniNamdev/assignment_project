import supertest from 'supertest'
import app from './App'

describe('Calculating the stocks qty based on given sku', () => {
  it('Existing sku should return valid qty', () =>
    supertest(app)
      .get('/?sku=LTV719449/39/39')
      .expect('Content-Type','application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.body.data.length = 1;
        res.body.data.sku = "LTV719449/39/39";
      })
  )

  it('Custom sku should return valid 0 qty', () =>
    supertest(app)
      .get('/?sku=LTV719449/39/39test')
      .expect('Content-Type','application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        res.body.data.length = 1;
        res.body.data.sku = "LTV719449/39/39";
        res.body.data.qty = 0;
      })
  )
})
