module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      login: String,
      password: String,
      easyScore: Number,
      mediumScore: Number,
      hardScore: Number,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
