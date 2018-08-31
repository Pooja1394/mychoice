import React, { Component } from 'react'
import UserProfileSummary from "../../component/userprofile/UserProfileSummary"
import UserProfileTracking from "../../component/userprofile/UserProfileTracking"
import UserProfileTradingStatus from "../../component/userprofile/UserProfileTradingStatus"
import UserProfileTradingTransaction from"../../component/userprofile/UserProfileTradingTransaction"
import UserProfileWinningTransaction from "../../component/userprofile/UserProfileWinningTransaction"
import UserProfileBuyItNowTransaction from"../../component/userprofile/UserProfileBuyItNowTransaction"
import UserProfileBuyBidsTransaction from "../../component/userprofile/UserProfileBuyBidsTransaction"
import UserProfileCouponTransaction from "../../component/userprofile/UserProfileCouponTransaction"
import UserProfileNotification from "../../component/userprofile/UserProfileNotification"
import UserProfileBadges from "../../component/userprofile/UserProfileBadges"
import UserProfilePlayingHistory from '../../component/userprofile/UserProfilePlayingHistory'
import {Route} from 'react-router-dom'

export default class UserProfileRoute extends Component {
  render() {
    return (
      <div>
      <Route  path='/home/user/userprofile/usersummary' component={UserProfileSummary}/>
      <Route  path='/home/user/userprofile/usertracking' component={UserProfileTracking}/>
      <Route  path='/home/user/userprofile/usertradingstatus' component={UserProfileTradingStatus}/>
      <Route  path='/home/user/userprofile/usertradingtransaction' component={UserProfileTradingTransaction}/>
      <Route  path='/home/user/userprofile/userwinningtransaction' component={UserProfileWinningTransaction}/>
      <Route  path='/home/user/userprofile/userbuyittransaction' component={UserProfileBuyItNowTransaction}/>
      <Route  path='/home/user/userprofile/userbidsbuytransaction' component={UserProfileBuyBidsTransaction}/>
      <Route  path='/home/user/userprofile/usercoupontransaction' component={UserProfileCouponTransaction}/>
      <Route  path='/home/user/userprofile/usernotification' component={UserProfileNotification}/>
      <Route  path='/home/user/userprofile/userbadges' component={UserProfileBadges}/>
      <Route  path='/home/user/userprofile/userplayinghistory' component={UserProfilePlayingHistory}/>
     
      </div>
    )
  }
}
