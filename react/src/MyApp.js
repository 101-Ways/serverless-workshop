import React, { Component } from 'react'

export default class MyApp extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  render() {
    const { data } = this.state

    console.log( { data })
    return !data ? <div>Loading ...</div> : <div>Mudi: {data.Mudi}</div>
  }

  componentDidMount() {
    fetch('http://localhost:3000/hello')
      .then(res => res.json())
      .then(data => this.setState({data}))
  }
}
