// components/ModalCards.js
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Untuk ikon tutup modal

export default function ModalCards({ isOpen, onOpenChange, game }) {
  if (!game) return null; // Jangan render modal jika tidak ada data game

  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside" // Agar konten bisa di-scroll jika panjang
      backdrop="blur" // Efek blur pada backdrop
      className="bg-gray-800 text-white" // Warna dasar modal
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 relative pb-2 border-b border-gray-700">
              <h2 className="text-2xl font-bold">{game.title}</h2>
              <Button
                isIconOnly
                variant="light"
                onPress={onClose}
                className="absolute top-4 right-4 text-white hover:bg-gray-700/50"
              >
                <XMarkIcon className="w-6 h-6" />
              </Button>
            </ModalHeader>
            <ModalBody className="py-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Image
                  src={game.thumbnail}
                  alt={game.title}
                  width={300}
                  height={200}
                  className="object-cover rounded-lg shadow-lg flex-shrink-0 w-full md:w-auto"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold mb-2">{game.short_description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center py-1 px-3 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                      {game.genre}
                    </span>
                    <span className="inline-flex items-center py-1 px-3 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                      {game.platform}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    <span className="font-semibold text-gray-400">Penerbit:</span> {game.publisher}
                  </p>
                  <p className="text-sm text-gray-300 mb-2">
                    <span className="font-semibold text-gray-400">Pengembang:</span> {game.developer}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-gray-400">Tanggal Rilis:</span> {new Date(game.release_date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="pt-4 border-t border-gray-700">
              <Button
                as="a"
                href={game.game_url}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                radius="lg"
                className="text-white font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                Mainkan Sekarang
              </Button>
              <Button color="danger" variant="flat" onPress={onClose} radius="lg">
                Tutup
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}