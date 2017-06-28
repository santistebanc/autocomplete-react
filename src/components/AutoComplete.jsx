import React from 'react';
import SuggestionsList from './SuggestionsList.jsx'
import SearchBox from './SearchBox.jsx'

export default class extends React.Component {
  state = { text: "", show: false, list: [] }
  handleChangeText = async (e) => {
    const query = e.currentTarget.value;
    this.setState({ text: query });

    if (query.length > 0) {
      const results = await this.props.fetch(e.currentTarget.value);
      this.setState({ show: true, list: results });
    } else {
      this.setState({ show: false });
    }

  }
  handleFocus = (e) => {
    if (this.state.text.length > 0 && this.state.list.length > 0) this.setState({ show: true });
    if (!this.justSelectedAnOption) e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)
    this.justSelectedAnOption = false;
  }
  handleBlur = (e) => {
    this.setState({ show: false });

    //refocus if the blur was caused by having selected a suggestion
    if (this.justSelectedAnOption) e.currentTarget.focus();
  }
  handleSelect = (text) => {
    this.justSelectedAnOption = true;
    this.setState({ text, list: [], show: false });
  }
  render() {
    return (
      <div style={this.props.style}>
        <SearchBox value={this.state.text} onChange={this.handleChangeText} onBlur={this.handleBlur} onFocus={this.handleFocus} />
        {this.state.show && <div style={{ position: 'relative' }}>
          <SuggestionsList list={this.state.list} onSelect={this.handleSelect} />
        </div>}
      </div>);
  }
}
