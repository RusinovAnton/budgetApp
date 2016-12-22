import React, { PropTypes } from 'react'

const UserMenu = ({ user }) => {
    if (!user) return null
    console.log(user)
    return (
        <div>
            <span>{ user.displayName }</span>
        </div>
    )
}

UserMenu.propTypes = {
    user: PropTypes.object
}

export default UserMenu
