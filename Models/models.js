const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: String,
  content: String,
});

const Message = mongoose.model('Message', messageSchema);


module.exports=Message