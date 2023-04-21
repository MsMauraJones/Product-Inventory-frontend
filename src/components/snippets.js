exports.getUser = (req, res) => {
    const userId = req.params.userId;
  
    User.findById(userId)
      .select('_id username email roles')
      .then(user =>{
        const roleIds = user.roles;
  
        return Role.find({ _id: { $in: roleIds } }).select('name _id');
      })
      .then(roles =>{
        const rolesMap = roles.reduce((map, role) => {
          map.set(role._id, role.name);
          return map;
        }, new Map());
  
        return User.findById(userId)
          .select('username email roles')
          .then(user => {
            const userIdSearchWithRoles = {
              userId: user._id,
              username: user.username,
              email: user.email,
              roles: user.roles.map(roleId => ({ _id: roleId, name: rolesMap.get(roleId) })),
            };
  
            res.send(userIdSearchWithRoles);
          });      
      })
      .catch(error => {
        console.error(error);
        res.status(500).send({ message: error });
      });
  };

  <div className="form-group">
  <label htmlFor="roles">Roles</label>
  <div>
    {roles.map((role) => (
      <div key={role._id} className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          value={role._id}
          checked={currentUser.roles.includes(role._id)}
          onChange={this.onChangeRoles}
        />
        <label htmlFor={role.name} className="form-check-label">
          {role.name}
        </label>
      </div>
    ))
</div>
</div>

onChangeRoles(e) {
    const selectedRoles = Array.from(e.target.selectedOptions, option => option.value);
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        roles: selectedRoles
      }
    }));
}

updateUser(){
    UserService.updateUser(
        this.state.currentUser.userId,
        this.state.currentUser
    )
    .then(response => {
        console.log(response.data);
        this.props.router.navigate('/adminallusers');
      })
      .catch(e => {
        console.log(e);
      });
}

onChangeRoles(e) {
    const roleId = e.target.value;
    const checked = e.target.checked;
    const { currentUser } = this.state;
    const roles = [...currentUser.roles];
  
    if (checked) {
      roles.push(roleId);
    } else {
      const index = roles.indexOf(roleId);
      if (index !== -1) {
        roles.splice(index, 1);
      }
    }
  
    this.setState({
      currentUser: {
        ...currentUser,
        roles,
      },
    });
  }

{this.state.allRoles.map((role) => (
                                  <div key={role._id} className="form-check">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      value={role._id}
                                      checked={this.state.currentUser.roles.includes(role._id)}
                                      onChange={this.onChangeRoles}
                                    />
                                    <label htmlFor={role.name} className="form-check-label">
                                      {role.name}
                                    </label>
                                  </div>
                                ))}
