module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        easy: Array,
        medium: Array,
        hard: Array
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Word = mongoose.model("word", schema);
    return Word;
  };
  