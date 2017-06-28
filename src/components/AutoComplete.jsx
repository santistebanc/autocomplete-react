import React from 'react';
import SuggestionsList from './SuggestionsList.jsx'
import SearchBox from './SearchBox.jsx'

export default class extends React.Component {
  state = { text: "", show: false, list: [], selectedIndex: -1 }
  searchSuggestions = async (query) => {
    const results = await this.props.fetch(query);
    this.setState({ list: results, selectedIndex: -1 });
  }
  handleChangeText = (e) => {
    this.setState({ show: true, text: e.currentTarget.value });
    this.searchSuggestions(e.currentTarget.value);
  }
  handleFocus = (e) => {
    if (!this.justClickedAnOption) e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)
    this.justClickedAnOption = false;
  }
  handleBlur = (e) => {
    this.setState({ show: false });

    //refocus if the blur was caused by having selected a suggestion
    if (this.justClickedAnOption) e.currentTarget.focus();
  }
  handleClickItem = (text) => {
    this.justClickedAnOption = true;
    this.searchSuggestions(text);
    this.setState({ text, list: [], show: false });
  }
  handleSelect = (text) => {
    this.setState({ text: text == undefined ? "" : text });
  }
  handleKeyDown = (e) => {
    if (e.key == "Enter") {
      this.searchSuggestions(this.state.text);
      this.setState({ show: false });
    }
    if (e.key == "ArrowUp" || e.key == "ArrowDown") {
      e.preventDefault();
      if (!this.state.show) {
        if (this.state.list.length == 0) this.searchSuggestions(this.state.text);
        this.setState({ show: true });
      } else {
        let nextIndex = this.state.selectedIndex;
        if (e.key == "ArrowUp") nextIndex--;
        if (e.key == "ArrowDown") nextIndex++;
        if (nextIndex >= this.state.list.length) nextIndex = -1;
        if (nextIndex < -1) nextIndex = this.state.list.length - 1;
        this.setState({ selectedIndex: nextIndex, show: true });
        this.handleSelect(this.state.list[nextIndex]);
      }
    }
  }
  render() {
    console.log(this.state.text)
    return (
      <div style={this.props.style}>
        <SearchBox value={this.state.text} onChange={this.handleChangeText} onBlur={this.handleBlur} onFocus={this.handleFocus} onKeyDown={this.handleKeyDown} />
        {this.state.show && this.state.list.length > 0 && <div style={{ position: 'relative' }}>
          <SuggestionsList list={this.state.list} onClickItem={this.handleClickItem} selectedIndex={this.state.selectedIndex} />
        </div>}
      </div>);
  }
}
