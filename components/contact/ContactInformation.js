import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { BioContent } from '../styles/ContactProfile';
import { Facebook } from '@material-ui/icons';
import { H5 } from '../styles/Typography';
import TagsList from '../tags/TagsList';

export function ContactInformation({ info, fullWidth }) {
  const hasAddressInfo =
      info.fbProfile ||
      info.city ||
      info.state ||
      info.postalCode ||
      info.country ||
      info.language,
    hasPhoneEmail =
      (info.emails && info.emails.length > 0) ||
      (info.phones && info.phones.length > 0);
  return (
    <Grid container spacing={1}>
      {info.bio && (
        <Grid item xs={12}>
          <BioContent>{info.bio}</BioContent>
        </Grid>
      )}
      {hasAddressInfo && (
        <Grid item xs={12} sm={6} md={fullWidth ? 6 : 4} lg={fullWidth ? 6 : 3}>
          {info.fbProfile && (
            <a href={info.fbProfile} target="_blank" rel="noopener noreferrer">
              <Facebook /> {info.fbProfile}
            </a>
          )}
          {info.city && <div>City: {info.city}</div>}
          {info.state && <div>State: {info.state}</div>}
          {info.postalCode && <div>Postal Code: {info.postalCode}</div>}
          {info.country && <div>Country: {info.country}</div>}
          {info.language && <div>Language: {info.language}</div>}
        </Grid>
      )}
      {hasPhoneEmail && (
        <Grid item xs={12} sm={6} md={fullWidth ? 6 : 4} lg={fullWidth ? 6 : 3}>
          {info.emails && info.emails.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <H5>Emails</H5>
              {info.emails.map((e, k) => (
                <div key={k}>
                  {e.label && e.label + ':'} {e.email}
                </div>
              ))}
            </div>
          )}
          {info.phones && info.phones.length > 0 && (
            <div>
              <H5>Phone Numbers</H5>
              {info.phones.map((p, k) => (
                <div key={k}>
                  {p.label && p.label + ':'} {p.number}
                </div>
              ))}
            </div>
          )}
        </Grid>
      )}
      {info.tags && info.tags.length > 0 && (
        <Grid item xs={12}>
          <TagsList tags={info.tags} />
        </Grid>
      )}
    </Grid>
  );
}

ContactInformation.propTypes = {
  info: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
};

ContactInformation.defaults = {
  fullWidth: false,
};
