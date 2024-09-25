import "./Player.css";
import { Players } from "./ListOfPlayer";
import { Modal } from "antd";
import { useState } from "react";

function Player() {
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Null ban đầu

  // Mở modal và đặt thông tin cầu thủ vào state
  const handleOpenModal = (player) => {
    setSelectedPlayer(player);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="player-container">
      {Players.map((player) => (
        <div className="column" key={player.id}>
          <div className="player-card">
            <img src={player.img} className="player-img" alt={player.name} />
            <h3 className="player-name">{player.name}</h3>
            <p className="player-team">{player.club}</p>
            <button
              className="player-button"
              onClick={() => handleOpenModal(player)} // Mở modal với player đã chọn
            >
              Detail
            </button>
          </div>
        </div>
      ))}

      {/* Hiển thị modal nếu có selectedPlayer */}
      {selectedPlayer && (
        <Modal
          open={selectedPlayer !== null}
          onCancel={handleCloseModal}
        >
          <div className="content">
            <div className="player-card">
              <img
                src={selectedPlayer.img}
                className="player-img"
                alt={selectedPlayer.name}
              />
              <h3 className="player-name">{selectedPlayer.name}</h3>
              <p className="player-team">{selectedPlayer.club}</p>
              <p>{selectedPlayer.info}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Player;
