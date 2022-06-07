import type { NextPage } from "next";
import { Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Footer from "../../../../src/components/footer";
import Navbar from "../../../../src/components/instructor/NavigationBar3";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { ResetCart, SaveCard } from "../../../../src/redux/actions/course/course";
import axios from "axios";
import {
  formatCreditCardNumber,
  formatCVC,
  formatMonth,
} from "../../../../src/components/util";
import withAuth from '../../../../src/components/Hoc/authRoute'
import { useRouter } from 'next/router'
import { SweetAlert } from "../../../../src/function/hooks";
import { Small } from "../../../../src/components/student/loader";
const Home: NextPage = () => {
  // const intl = useIntl();
  const [acoountDetail, setAcoountDetail] = useState({
    number: "",
    experyDate: "",
    year: '',
    SecourtyCode: "",
    focus: "",
  });
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState('')
  const [cardType, setCardType] = useState(0)
  const [cvc, setCvc] = useState('');
  const [card, setCard] = useState('');
  const [exMoth, setExMoth] = useState('');
  const [exYear, setExYear] = useState('');
  const [cardDetail, setCardDetail] = useState([]);
  const [payments, setPayments] = useState(false);
  const [complPay, setComplPay] = useState(false);
  const [state, setState] = useState('');
  const [buynow, setBuyNow] = useState([])
  const [cards, setCards] = useState([
    '/assets/images/card-amex.svg',
    '/assets/images/card-discover.svg',
    '/assets/images/card-visa.svg',
    '/assets/images/mastercard.svg',
  ])



  const dispatch = useDispatch()
  const router = useRouter()



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "number") {
      event.target.value = formatCreditCardNumber(event.target.value);
    } else if (event.target.name === "experyDate") {
      event.target.value = formatMonth(event.target.value);
    } else if (event.target.name === "SecourtyCode") {
      event.target.value = formatCVC(event.target.value);
    }
    setAcoountDetail({
      ...acoountDetail,
      [event.target.name]: event.target.value,
    });
  };




  const { token, } = useSelector((state: RootStateOrAny) => state?.userReducer)

  const AxInstance = axios.create({
    // .. where we make our configurations
    baseURL: 'https://dev.thetechub.us/bolloot/',
    headers: {
      token: token
    }
  });







  useEffect(() => {

    let fetchCart = async () => {
      try {
        let res = await AxInstance.get('api//stripe/card/all')
        if (res.data.success === true) {
          setCardDetail(res.data.response.cards)
        }
      }
      catch (err) {
      }
    }

    setTimeout(() => {
      setLoading(false)
    }, 2000)


    fetchCart()
  }, [payments])



  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true)
    try {

      let parts = experyDate.split('/');
      let month = parts[0];
      let year = parts[1];

      let detail = {
        card_number: number,
        exp_month: month,
        exp_year: year,
        cvc: SecourtyCode
      }
      let res = await AxInstance.post("api//stripe/card/store", detail)
      if (res.data.success === true) {
        dispatch(SaveCard(res.data.response.card.id))
        setAcoountDetail('')
        setLoader(false)
        setPayments(false)
        setErrors('')
        SweetAlert({ icon: "success", text: res.data.message })

      }
      else {
        let check = typeof res.data.errors
        if (check === "string") {
          setErrors(res.data.errors)
          SweetAlert({ icon: "error", text: res.data.errors })
          setLoader(false)
        }
        else {
          setLoader(false)
          setCard(res.data.errors?.card_number[0])
          setExMoth(res.data.errors?.exp_month[0])
          setExYear(res.data.errors?.exp_year[0])
          setCvc(res.data.errors?.cvc[0])
        }

      }

    } catch (err) {
      setLoader(false)

    }
  };




  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    // debugger
    e.preventDefault();
    try {

      setComplPay(true)
      let res = await AxInstance.post('api//instructor/withdraw', { amount: state, payment_method: cardType })
      if (res.data.success === true) {
        setComplPay(false)
        dispatch(ResetCart())
        SweetAlert({ icon: "success", text: res.data.message })
        router.push('/en/instructor')

      }
      else {
        setLoader(false)
        SweetAlert({ icon: "error", text: res.data.error })

      }
    }
    catch (err) {
      setLoader(false)
      SweetAlert({ icon: "error", text: err })

    }
  };







  const {
    number,
    experyDate,
    SecourtyCode,

  } = acoountDetail;
  return (
    <>
      <div className="inst">
        <Navbar />
        {loading ? <div style={{ textAlign: 'center', margin: '10rem' }}>
          <Spinner animation="border" />
        </div>
          :

          <div className="container-3">
            <div className="shipping-2">
              <h3>Withdraw</h3>
              <p className="msakdo-sda">Billing Address:</p>
            </div>
            <div className="d-flex justify-content-between hdsafjf-dsa ">
              <div className="jasdf-dsandase">
                {cardDetail ? cardDetail.map((card) => (
                  <div key={card?.id}>
                    <button className="btn" onClick={() => setCardType(card?.id)}>
                      <div>
                        <span>
                          <input
                            type="radio"
                            name="cardType"
                            checked={cardType === card?.id}
                            onChange={(e) => setCardType(card?.id)}
                          />
                        </span>
                        {card?.brand} ( {card?.last4} )
                      </div>
                      <div style={{ display: 'flex' }}>
                        <img src={`/assets/images/${card?.brand}.svg`} alt="cards" style={{ border: '1pt solid ', marginLeft: '5px', width: '40px', padding: '2px', height: '30px' }} />

                      </div>
                    </button>
                  </div>
                ))
                  : Small()
                }

                <div>
                  <span
                    style={{ cursor: 'pointer', color: 'blue' }}
                    onClick={() => setPayments(!payments)}
                  >
                    + Add another payment method
                  </span>
                </div>

                {payments ?
                  <>
                    <div className="d-flex justify-content-between flex-wrap mt-3">

                      <div className={card ? "check-input  input_filed_error" : "check-input"} style={{ display: 'flex', flexDirection: 'column' }}>
                        <input
                          pattern="[\d| ]{16,22}"
                          type="tel"
                          className="input_filed_error"
                          name="number" value={number} onChange={(e) => handleChange(e)} placeholder="Card Number " />
                        {card && <div className="invalid mt-2">{card}</div>}

                      </div >
                      <div className={exMoth ? "check-input  input_filed_error" : "check-input"} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <input
                          pattern="\d\d/\d\d"
                          type="tel"
                          name="experyDate" value={experyDate} onChange={(e) => handleChange(e)} placeholder="mm/yy" />

                        {exMoth && exYear && <div className="invalid mt-2">{`${exMoth} & ${exYear}`}</div>}
                      </div>
                      <div className={cvc ? "check-input mt-3 input_filed_error " : "check-input mt-3 "} style={{ display: 'flex', flexDirection: 'column' }} >
                        <input
                          pattern="\d{3,4}"
                          type="tel"
                          maxLength={3} name="SecourtyCode" value={SecourtyCode} onChange={(e) => handleChange(e)} placeholder="Security Code " type="number" />
                        {cvc && <div className="invalid mt-2">{cvc}</div>}

                      </div>


                    </div>

                    <div style={{ margin: '25px 0px', cursor: 'pointer ' }}>
                      <span
                        className="btn-1s w-100"
                        style={{ padding: '15px 50px' }}
                        onClick={(e) => handleClick(e)}
                      >
                        {loader ?
                          <div className="spinner-border text-light" style={{ marginBottom: '-5px', fontSize: '20px', width: '25px', height: '25px' }} role="status">
                          </div>
                          :
                          "Add "
                        }
                      </span>
                    </div>

                  </>
                  : null}

              </div>
              <div className="photo-maker-2">

                <h3>Withdraw Ammount</h3>
                <div className="hdsafj-dsae1">
                  <div className="p-field w-100">
                    <input type="number" placeholder="Ammount" value={state} onChange={(e) => setState(e.target.value)} />
                    {/* {errors?.password && <div className="invalid mb-1">{errors?.password[0]}</div>} */}

                  </div>
                </div>

                <button
                  className="btn-2s w-100 mt-3"
                  onClick={(e) => handleSubmit(e)}
                  disabled={cardType ? false : true}
                  style={cardType ? { opacity: 1 } : { opacity: 0.5 }}
                >
                  {complPay ?
                    <div className="spinner-border text-light" style={{ marginBottom: '-5px', fontSize: '20px', width: '25px', height: '25px' }} role="status">
                    </div>
                    :
                    "Withdraw"
                  }

                </button>
              </div>
            </div>
          </div>
        }
        <Footer />
        {/* {payments ? (
          <StripeContainer openToggle={(e) => setPayments(e)} open={payments} />
        ) : null} */}
      </div>
    </>
  );
};

export default withAuth(Home);
