const { Transaction } = require('sequelize');
// Giả sử bạn đã import sequelize instance và Model Seat của bạn
// const { sequelize, Seat } = require('./models'); 

try {
  // Bắt đầu một Managed Transaction trong Sequelize
  const result = await sequelize.transaction(async (t) => {
    
    // 1. Tìm ghế và KHÓA dòng này lại (SELECT ... FOR UPDATE)
    const seat = await Seat.findOne({
      where: {
        id: seatId,
        showtimeId: showtimeId
      },
      // Chốt chặn quan trọng: Khóa dòng này lại, các request sau sẽ phải xếp hàng đợi
      lock: t.LOCK.UPDATE, 
      transaction: t // Bắt buộc phải truyền instance transaction vào đây
    });

    // Kiểm tra xem ghế có tồn tại không
    if (!seat) {
      throw new Error("Ghế không tồn tại trong suất chiếu này!");
    }

    // 2. Kiểm tra xem ghế đã bị ai đặt hoặc giữ chưa
    if (seat.isHolding || seat.isBooked) {
      // Trong Managed Transaction, chỉ cần ném ra lỗi (throw Error), 
      // Sequelize sẽ tự động thực hiện ROLLBACK cho bạn.
      throw new Error("Ghế này đã có người nhanh tay chọn trước!");
    }

    // 3. Nếu ghế còn trống, cập nhật trạng thái giữ ghế
    // Sử dụng chính instance 'seat' vừa tìm thấy để update sẽ an toàn và đồng bộ nhất
    await seat.update({
      isHolding: true,
      holdingBy: userId,
      heldAt: new Date()
    }, { 
      transaction: t // Vẫn phải truyền transaction vào lệnh update
    });

    // Trả về dữ liệu cần thiết sau khi transaction thành công
    return { seatId, userId };
  });

  // 4. Nếu transaction thành công (đã COMMIT xong vào DB) -> Trigger Pusher
  await pusher.trigger(`showtime-${showtimeId}`, 'seat-updated', {
    seatId: result.seatId,
    userId: result.userId,
    isSelecting: true
  });

  return result;

} catch (error) {
  // Bắt các lỗi bao gồm cả lỗi "Ghế đã có người chọn trước" hoặc lỗi kết nối DB
  console.error("Đặt ghế thất bại:", error.message);
  throw error;
}