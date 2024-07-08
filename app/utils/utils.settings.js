const profileFunction = () => { console.log('logout.......') }
const accountFunction = () => { console.log('accountFunction.......') }
const settingsFunction = () => { console.log('settingsFunction.......') }
const helpFunction = () => { console.log('Help.......') }

const logout = async (setIsLoggedIn) => {
  const res = await fetch('http://localhost:3000/api/user', { method: 'DELETE' })
  if (res.ok) {
    setIsLoggedIn(null)
    window.location.reload();
  }
}

export const settings = [
  { title: 'Profile', action: profileFunction },
  { title: 'Account', action: accountFunction },
  { title: 'Settings', action: settingsFunction },
  { title: 'Help', action: helpFunction },
  { title: 'Logout', action: logout }
];