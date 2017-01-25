import React, { PropTypes } from 'react'


const UserMenu = ({ user, onSignOut }) => {
  if (!user) return null

  return (
    <aside className="sidebar">
      <h2>{ user.displayName || 'Unknown' }</h2>
      <button className='blue' onClick={ onSignOut }>Sign out</button>
    </aside>
  )
}

UserMenu.propTypes = {
  user: PropTypes.object
}

export default UserMenu
