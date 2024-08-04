var express = require('express')
var path = require('path')
var Web3 = require('web3')
const spawn = require('child_process').spawn

const HealhtDataJSON = require('../solidity/build/contracts/HealthData.json')

const bodyParser = require('body-parser')
const fs = require('fs')
const csv = require('csv-parser')

const data = {}

var app = express()

// view engine setup
app.set('views', 'views')
app.engine('html', require('squirrelly').renderFile)
app.set('view engine', 'html')
app.use('/images', express.static('public/images'))
app.use('/stylesheets', express.static('public/stylesheets'))
app.use('/js', express.static('public/javascripts'))
app.use('/csv', express.static('public/csv'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

var web3, account, contract
let response = {}

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

//Connect Blockchain Ethereum Server
async function initialConnection() {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8000'))
  contract = new web3.eth.Contract(
    HealhtDataJSON.abi,
    HealhtDataJSON.networks[9876].address
  )
  await web3.eth.getAccounts().then((accounts) => {
    account = accounts[0]
    console.log('Connected')
  })
}

app.get('/', async (req, res, next) => {
  res.render('dashboard.html')
})

app.get('/addData', async (req, res, next) => {
  res.render('addData.html')
})

//for analysis from model
app.post('/analysis', async (req, res, next) => {
  await initialConnection()
  // Parse the data from the request body
  const {
    name,
    date,
    totalSteps,
    totalDistance,
    veryActiveDist,
    veryActiveMins,
    moderateActiveDist,
    fairlyActiveMins,
    lightActiveDist,
    lightlyActiveMins,
  } = req.body

  var childPython = spawn('python', [
    '../python/script.py',
    parseInt(totalSteps),
    parseInt(totalDistance),
    parseInt(veryActiveDist),
    parseInt(veryActiveMins),
    parseInt(moderateActiveDist),
    parseInt(fairlyActiveMins),
    parseInt(lightActiveDist),
    parseInt(lightlyActiveMins),
  ])

  var result = ''
  childPython.stdout.on(`data`, (data) => {
    result += data
  })
  childPython.on('close', async function () {
    console.log(result)
    //insert data in the blockchain
    var hashResp
    await contract.methods
      .insUserData(
        name,
        date,
        totalSteps,
        totalDistance,
        veryActiveDist,
        veryActiveMins,
        moderateActiveDist,
        fairlyActiveMins,
        lightActiveDist,
        lightlyActiveMins,
        result
      )
      .send({ from: account })
      .on('transactionHash', function (hash) {
        hashResp = hash
      })
    console.log('Transaction inserted at block: ', hashResp)
    response.status = 200
    response.msg = {
      score: result,
      blockChainHash: hashResp,
    }
    res.status(response.status).send(response)
  })
  childPython.on('error', function (err) {
    console.log(err)
    response.status = 500
    response.msg = 'An error occurred while analysis!'
    res.status(response.status).send(response)
  })
})

module.exports = app
