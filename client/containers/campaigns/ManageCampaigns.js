import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { getCampaigns } from '../../actions/campaignActions';

function mapStateToProps(state) {
  // State reducer @ state.manageCampaign
  return { campaigns: state.manageCampaign.campaigns, isGetting: state.manageCampaign.isGetting };
}

@connect(mapStateToProps, { getCampaigns })
export default class ManageCampaigns extends Component {

  static propTypes = {
    getCampaigns: PropTypes.func.isRequired,
    campaigns: PropTypes.array.isRequired,
    isGetting: PropTypes.bool.isRequired
  }

  componentDidMount() {
    // Update campaigns only if we need to
    if (!this.props.campaigns.length) {
      this.props.getCampaigns();
    }
  }

  render() {
    return (
      <div>
        <div className="content-header">
          <h1>Manage campaigns
            <small>Edit or delete your campaigns here</small>
          </h1>
        </div>

        <section className="content">
          <div className="box">
            <div className="box-header">
              <h3 className="box-title">Your campaigns</h3>
            </div>

            <div className="box-body">
              {/* Need to improve this in due time */}

              <ol>
                {this.props.campaigns.map(campaign => {
                  return (
                    <li>{`List: "${campaign.name}" # Created at ${campaign.createdAt} # Last updated at ${campaign.updatedAt}`}</li>
                  );
                })}
              </ol>

              {this.props.isGetting && <div className="overlay">
                <FontAwesome name="refresh" spin/>
              </div>}
            </div>
          </div>
        </section>
      </div>
    )
  }
}