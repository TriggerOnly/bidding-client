import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export const DetailsModal = ({ open, onClose, title, filteredCriteria, filteredParticipants, description }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Описание:</strong> {description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Критерии:</strong>
        </Typography>
        {filteredCriteria.length === 0 ? (
          <Typography variant="body2">Нет критериев</Typography>
        ) : (
          <List>
            {filteredCriteria.map((criterion) => (
              <ListItem key={criterion._id}>
                <ListItemText primary={criterion.title || 'Без названия'} />
              </ListItem>
            ))}
          </List>
        )}

        <Typography variant="body1" gutterBottom>
          <strong>Участники:</strong>
        </Typography>
        {filteredParticipants.length === 0 ? (
          <Typography variant="body2">Нет участников</Typography>
        ) : (
          <List>
            {filteredParticipants.map((participant) => (
              <ListItem key={participant._id}>
              <ListItemText
                primary={participant.nameOrganization || 'Без названия'}
                secondary={`Сумма: ${participant.coast || 'Нет данных'}`}
              />
            </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Modal>
  );
};
